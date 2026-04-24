import { create } from 'zustand';

import { projectsData, Project } from '@/data/projects';

export type TimelineState = 'PAST' | 'PRESENT' | 'FUTURE';

interface AppState {
  timelineState: TimelineState;
  activeGadgetId: string | null;
  isTransitioning: boolean;
  projects: Project[];
  setTimelineState: (state: TimelineState) => void;
  setActiveGadgetId: (id: string | null) => void;
  setTransitioning: (val: boolean) => void;
  setProjects: (projects: Project[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  timelineState: 'PRESENT',
  activeGadgetId: null,
  isTransitioning: false,
  projects: projectsData,
  setTimelineState: (state) => set({ timelineState: state }),
  setActiveGadgetId: (id) => set({ activeGadgetId: id }),
  setTransitioning: (val) => set({ isTransitioning: val }),
  setProjects: (projects) => set({ projects }),
}));
