"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useTraining } from "@/hooks/training/useTraining"
import { MENTORS, SKILLS_POOL } from "@/constants/training"
import {
  TrainingTabs,
  TrainingStatsCards,
  TrainingOverview,
  TrainingFilters,
  TraineesList,
  MentorDashboard,
  TraineeViewPanel,
  AssignModal,
  FeedbackModal,
} from "@/components/dashboard/training"

export default function TrainingPage() {
  const t = useTraining()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Training & Development</h1>
          <p className="text-slate-500 text-sm mt-1">Onboard trainees, assign mentors, and track skill development</p>
        </div>
        <Button
          onClick={() => t.setAssignOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Assign Trainee
        </Button>
      </div>

      <TrainingTabs activeTab={t.activeTab} setActiveTab={t.setActiveTab} />

      {t.activeTab === "overview" && (
        <>
          <TrainingStatsCards stats={t.stats} />
          <TrainingOverview trainees={t.trainees} mentors={MENTORS} getMentor={t.getMentor} />
        </>
      )}

      {t.activeTab === "trainees" && (
        <>
          <TrainingFilters
            searchQuery={t.searchQuery}
            setSearchQuery={t.setSearchQuery}
            filterMentor={t.filterMentor}
            setFilterMentor={t.setFilterMentor}
            filterStatus={t.filterStatus}
            setFilterStatus={t.setFilterStatus}
            filterSkill={t.filterSkill}
            setFilterSkill={t.setFilterSkill}
            mentors={MENTORS}
            skills={SKILLS_POOL}
          />
          <TraineesList
            filtered={t.filtered}
            getMentor={t.getMentor}
            onFeedback={t.setFeedbackModal}
            onUpdateProgress={t.handleUpdateProgress}
          />
        </>
      )}

      {t.activeTab === "mentors" && (
        <MentorDashboard
          mentors={MENTORS}
          trainees={t.trainees}
          activeMentorTab={t.activeMentorTab}
          setActiveMentorTab={t.setActiveMentorTab}
          onFeedback={t.setFeedbackModal}
          onUpdateProgress={t.handleUpdateProgress}
        />
      )}

      {t.activeTab === "my-view" && (
        <>
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700">View as trainee</label>
          </div>
          <TraineeViewPanel trainees={t.trainees} mentors={MENTORS} onFeedback={t.setFeedbackModal} />
        </>
      )}

      <AssignModal
        open={t.assignOpen}
        onClose={() => t.setAssignOpen(false)}
        onAssign={t.handleAssign}
        mentors={MENTORS}
        skills={SKILLS_POOL}
      />
      <FeedbackModal
        open={!!t.feedbackModal}
        onClose={() => t.setFeedbackModal(null)}
        trainee={t.feedbackModal}
        onAdd={t.handleAddFeedback}
      />
    </div>
  )
}
