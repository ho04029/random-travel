import { TripWithDestinations } from '@/types/trip';

// 여행 후기에서 여행지 이름 목록을 쉼표로 구분
export function getDestinationNames(trip: TripWithDestinations): string {
  return trip.trip_record_destinations
    .map((td) => td.destinations?.name)
    .filter(Boolean)
    .join(', ');
}
