/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arnav Abacus Academy (AAA) — Admissions & Lead Lifecycle Dashboard
 * Governing Determination: MGT-DET-S4-S2-AUTH-02 (WS-13)
 * Authority: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

import React, { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  Filter
} from "lucide-react";
import { 
  LeadRecord, 
  LeadState, 
  MicroBatchRecord, 
  SLAStatus 
} from "../../types/crm";
import { 
  calculateSLAStatus, 
  transitionLeadState, 
  enrollLeadIntoBatch,
  BatchCapacityExceededError,
  InvalidStateTransitionError
} from "../../lib/crmStateMachine";

interface LeadLifecycleDashboardProps {
  initialLeads?: LeadRecord[];
  initialBatches?: MicroBatchRecord[];
}

export default function LeadLifecycleDashboard({
  initialLeads = [],
  initialBatches = []
}: LeadLifecycleDashboardProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [batches, setBatches] = useState<MicroBatchRecord[]>(initialBatches);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "ACTIVE" | "DISCOVERY" | "ENROLLED">("ACTIVE");
  const [activeMessage, setActiveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Grouped counts
  const totalActive = leads.filter(l => l.currentState !== "ENROLLED" && l.currentState !== "ENQUIRY_CANCELLED" && l.currentState !== "LEAD_DORMANT_PURGE_PENDING").length;
  const totalDiscovery = leads.filter(l => l.currentState.startsWith("DISCOVERY") || l.currentState === "OBSERVATION_COMPLETED").length;
  const totalEnrolled = leads.filter(l => l.currentState === "ENROLLED").length;

  const handleTransition = (leadId: string, nextState: LeadState, notes?: string) => {
    setActiveMessage(null);
    try {
      const targetLead = leads.find(l => l.leadId === leadId);
      if (!targetLead) return;

      const actor = nextState === "OBSERVATION_COMPLETED" ? "ACADEMIC_DIRECTOR" : "ADMISSIONS_COORDINATOR";
      const actorName = nextState === "OBSERVATION_COMPLETED" ? "Founder Neha Patil" : "Admissions Lead";

      const updated = transitionLeadState(targetLead, nextState, actor, actorName, notes);
      setLeads(prev => prev.map(l => l.leadId === leadId ? updated : l));
      setActiveMessage({ type: "success", text: `Lead ${leadId} transitioned to ${nextState} successfully.` });
    } catch (err: unknown) {
      if (err instanceof InvalidStateTransitionError || err instanceof Error) {
        setActiveMessage({ type: "error", text: err.message });
      }
    }
  };

  const handleEnrollment = (leadId: string, batchId: string) => {
    setActiveMessage(null);
    try {
      const targetLead = leads.find(l => l.leadId === leadId);
      const targetBatch = batches.find(b => b.batchId === batchId);
      if (!targetLead || !targetBatch) return;

      const { updatedLead, updatedBatch } = enrollLeadIntoBatch(targetLead, targetBatch);
      setLeads(prev => prev.map(l => l.leadId === leadId ? updatedLead : l));
      setBatches(prev => prev.map(b => b.batchId === batchId ? updatedBatch : b));
      setActiveMessage({ 
        type: "success", 
        text: `Enrolled successfully! Generated Student UID: ${updatedLead.enrolledStudentUid} (Batch: ${updatedBatch.batchName} has ${updatedBatch.enrolledCount}/5 seats filled).` 
      });
    } catch (err: unknown) {
      if (err instanceof BatchCapacityExceededError || err instanceof Error) {
        setActiveMessage({ type: "error", text: err.message });
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "ACTIVE") return lead.currentState !== "ENROLLED" && lead.currentState !== "ENQUIRY_CANCELLED" && lead.currentState !== "LEAD_DORMANT_PURGE_PENDING";
    if (selectedFilter === "DISCOVERY") return lead.currentState.startsWith("DISCOVERY") || lead.currentState === "OBSERVATION_COMPLETED";
    if (selectedFilter === "ENROLLED") return lead.currentState === "ENROLLED";
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AcademyOS Admissions Lifecycle</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              14-State Admissions &amp; Discovery Coordinator
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Wakad Center, Pune • Strictly Small Batches (Max 5 Students) • Zero Commission Sales
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> DPDP Protected
            </span>
          </div>
        </div>

        {/* Global Notification Banner */}
        {activeMessage && (
          <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between animate-fade-in ${
            activeMessage.type === "success" 
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}>
            <span>{activeMessage.text}</span>
            <button onClick={() => setActiveMessage(null)} className="underline cursor-pointer">Dismiss</button>
          </div>
        )}

        {/* Summary Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Pipeline</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{totalActive}</span>
            <span className="text-[11px] text-slate-500">Inbound &amp; ongoing follow-ups</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Discovery Sessions</span>
            <span className="text-3xl font-black text-orange-600 mt-1 block">{totalDiscovery}</span>
            <span className="text-[11px] text-slate-500">Scheduled / Under Neha's observation</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Enrolled Students</span>
            <span className="text-3xl font-black text-emerald-600 mt-1 block">{totalEnrolled}</span>
            <span className="text-[11px] text-slate-500">Active AcademyOS student profiles</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Micro-Batch Pacing</span>
            <span className="text-3xl font-black text-purple-600 mt-1 block">Max 5</span>
            <span className="text-[11px] text-slate-500">Strict child-development limit</span>
          </div>
        </div>

        {/* Micro-Batches Capacity Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Active Wakad Micro-Batches (Cap: 5 Students/Batch)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {batches.map(batch => {
              const isFull = batch.enrolledCount >= batch.maxCapacity;
              return (
                <div 
                  key={batch.batchId} 
                  className={`p-4 rounded-2xl border ${isFull ? "bg-rose-50/40 border-rose-200" : "bg-slate-50 border-slate-200"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{batch.batchName}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isFull ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {batch.enrolledCount} / {batch.maxCapacity} Seats
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{batch.program}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{batch.schedule}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
            {(["ACTIVE", "DISCOVERY", "ENROLLED", "ALL"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedFilter === tab 
                    ? "bg-slate-900 text-white shadow-xs" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-semibold">Showing {filteredLeads.length} leads</span>
        </div>

        {/* Leads Table / Cards */}
        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs font-semibold">
              No leads match the selected filter.
            </div>
          ) : (
            filteredLeads.map(lead => {
              const sla = calculateSLAStatus(lead);
              return (
                <div 
                  key={lead.leadId} 
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{lead.parentName}</span>
                        <span className="text-xs text-slate-400 font-mono">({lead.phone})</span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Age: {lead.childAgeGroup}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {lead.programInterest} • Preferred: <strong className="capitalize">{lead.preferredMode}</strong>
                      </p>
                    </div>

                    {/* Current State & SLA Badge */}
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-900 text-white font-mono text-xs px-3 py-1 rounded-xl font-bold">
                        {lead.currentState}
                      </span>
                      
                      {lead.currentState !== "ENROLLED" && (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 border ${
                          sla.status === "BREACHED" 
                            ? "bg-rose-50 text-rose-700 border-rose-200" 
                            : sla.status === "WARNING" 
                            ? "bg-amber-50 text-amber-700 border-amber-200" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{sla.elapsedHours}h / {sla.maxDurationHours}h</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contextual Action Drawer based on State */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Entered: {new Date(lead.stateEnteredAt).toLocaleString()} • Reschedules: {lead.rescheduleCount}
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {lead.currentState === "ENQUIRY_RECEIVED" && (
                        <button
                          onClick={() => handleTransition(lead.leadId, "PARENT_CONTACTED", "Initial call completed")}
                          className="bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                      )}

                      {lead.currentState === "PARENT_CONTACTED" && (
                        <button
                          onClick={() => handleTransition(lead.leadId, "DISCOVERY_SCHEDULED", "Slot booked for Saturday 10:30 AM")}
                          className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Book Discovery Slot
                        </button>
                      )}

                      {lead.currentState === "DISCOVERY_SCHEDULED" && (
                        <>
                          <button
                            onClick={() => handleTransition(lead.leadId, "DISCOVERY_REMINDED", "24h reminder sent")}
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                          >
                            Send Reminder
                          </button>
                          <button
                            onClick={() => handleTransition(lead.leadId, "DISCOVERY_RESCHEDULED", "Parent requested next week")}
                            className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                          >
                            Reschedule
                          </button>
                        </>
                      )}

                      {lead.currentState === "DISCOVERY_REMINDED" && (
                        <>
                          <button
                            onClick={() => handleTransition(lead.leadId, "DISCOVERY_ATTENDED", "Parent & child present")}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                          >
                            Check-in Session
                          </button>
                          <button
                            onClick={() => handleTransition(lead.leadId, "DISCOVERY_NO_SHOW", "Parent missed appointment")}
                            className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                          >
                            Mark No-Show
                          </button>
                        </>
                      )}

                      {lead.currentState === "DISCOVERY_ATTENDED" && (
                        <button
                          onClick={() => handleTransition(lead.leadId, "OBSERVATION_COMPLETED", "Scored across 6 Option D dimensions")}
                          className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Complete Observation (Neha Ma'am)
                        </button>
                      )}

                      {lead.currentState === "OBSERVATION_COMPLETED" && (
                        <button
                          onClick={() => handleTransition(lead.leadId, "RECOMMENDATION_DELIVERED", "Delivered Abacus Foundation Level 1 roadmap")}
                          className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Deliver Recommendation
                        </button>
                      )}

                      {lead.currentState === "RECOMMENDATION_DELIVERED" && (
                        <button
                          onClick={() => handleTransition(lead.leadId, "DECISION_PENDING", "Parent evaluating family weekend timings")}
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Set Decision Pending
                        </button>
                      )}

                      {(lead.currentState === "DECISION_PENDING" || lead.currentState === "FOLLOW_UP_ACTIVE" || lead.currentState === "RECOMMENDATION_DELIVERED") && (
                        <div className="flex items-center gap-1.5">
                          {batches.filter(b => b.enrolledCount < b.maxCapacity).slice(0, 1).map(b => (
                            <button
                              key={b.batchId}
                              onClick={() => handleEnrollment(lead.leadId, b.batchId)}
                              className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-3.5 py-1.5 rounded-xl cursor-pointer flex items-center gap-1"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Enroll in {b.batchName}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {lead.currentState === "ENROLLED" && (
                        <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Student UID: {lead.enrolledStudentUid}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
