import { createFileRoute } from '@tanstack/react-router'
import PricingPlans from '../components/pricing/PricingPlans'
import AnimatedBackground from '../components/3d/AnimatedBackground'

export const Route = createFileRoute('/pricing')({
  component: () => (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <PricingPlans />
      </div>
    </div>
  ),
})
