const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GeoFirestore } = require("geofirestore");

admin.initializeApp();
const firestore = admin.firestore();
const geofirestore = new GeoFirestore(firestore);

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

exports.getAllNearbySorted = functions.https.onRequest(async (req, res) => {
  try {
    const { lat, lng, radius, type } = req.query;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchRadius = parseFloat(radius) || 10;

    // Collections to query
    let collections = ["doctors", "pharmacies", "labs", "ambulances", "homecare"];
    
    // If a valid type filter is applied, use only that collection
    if (type && collections.includes(type)) {
      collections = [type];
    }

    let allResults = [];

    await Promise.all(
      collections.map(async (col) => {
        const geoRef = geofirestore.collection(col);
        const query = geoRef.near({ center: new admin.firestore.GeoPoint(userLat, userLng), radius: searchRadius });
        const snapshot = await query.get();

        snapshot.docs.forEach(doc => {
          const data = doc.data();
          // Ensure location data exists and has latitude and longitude
          if (data.location && data.location.latitude && data.location.longitude) {
            const dist = haversineDistance(userLat, userLng, data.location.latitude, data.location.longitude);
            allResults.push({
              id: doc.id,
              name: data.name || "Unnamed",
              type: col, // doctor, pharmacy, etc.
              distance: dist.toFixed(2),
              ...data
            });
          }
        });
      })
    );

    // Sort by distance
    allResults.sort((a, b) => a.distance - b.distance);
    
    // Allow CORS for all origins
    res.set('Access-Control-Allow-Origin', '*');
    
    res.json({
      success: true,
      services: allResults
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});