
"use client";

import { PharmacyOrdersHero } from "@/components/pharmacy-orders-hero";
import { PharmacyOrdersList } from "@/components/pharmacy-orders-list";

export default function PharmacyOrdersPage() {
  return (
    <div className="bg-background">
      <PharmacyOrdersHero />
      <PharmacyOrdersList />
    </div>
  );
}
