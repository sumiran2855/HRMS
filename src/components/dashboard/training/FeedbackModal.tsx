import React, { useState } from "react"
import { Trainee, Feedback } from "@/types/training.types"
import { Modal, inputClass } from "./TrainingHelpers"

interface Props {
  open: boolean
  onClose: () => void
  trainee: Trainee | null
  onAdd: (tid: string, fb: Feedback) => void
}

export default function FeedbackModal({ open, onClose, trainee, onAdd }: Props) {
  const [note, setNote] = useState("")
  const [rating, setRating] = useState(3)

  if (!trainee) return null

  const handleSubmit = () => {
    if (!note.trim()) return

    onAdd(trainee.id, {
      id: `f${Date.now()}`,
      mentorId: trainee.mentorId,
      mentorName: "You (Mentor)",
      date: new Date().toISOString().slice(0, 10),
      note,
      rating,
    })

    setNote("")
    setRating(3)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`Add feedback — ${trainee.name}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= rating
              return (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className="w-9 h-9 rounded-lg border text-base transition-colors"
                  style={{
                    borderColor: active ? "#f59e0b" : "#e2e8f0",
                    backgroundColor: active ? "#fef3c7" : "white",
                  }}
                >
                  {active ? "★" : "☆"}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Feedback & notes</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your evaluation, suggestions, or comments..."
            className={inputClass}
            rows={5}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </Modal>
  )
}
