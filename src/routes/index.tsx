import { createFileRoute } from '@tanstack/react-router'
import EnhancedResumeBuilder from '../components/resume/EnhancedResumeBuilder'

export const Route = createFileRoute('/')({
  component: () => <EnhancedResumeBuilder />,
})
