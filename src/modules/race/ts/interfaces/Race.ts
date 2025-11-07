import type { RaceParticipant } from ".//RaceParticipant";

export interface Race {
  id: number;
  title: string;
  length: number;
  participants: RaceParticipant[];
}
