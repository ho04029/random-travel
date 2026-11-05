import { describe, expect, it } from 'vitest';
import { getDestinationNames } from '@/utils/trip';
import { TripWithDestinations } from '@/types/trip';

const createTrip = (
  destinations: TripWithDestinations['trip_record_destinations'],
): TripWithDestinations => ({
  id: 'trip-1',
  title: '제주 여행',
  content: null,
  start_date: '2026-01-10',
  end_date: '2026-01-15',
  rating: 5,
  user_id: 'user-1',
  created_at: '2026-01-16T00:00:00Z',
  updated_at: '2026-01-16T00:00:00Z',
  trip_record_destinations: destinations,
});

describe('getDestinationNames', () => {
  it('여행지 이름을 쉼표로 구분해 반환한다', () => {
    const trip = createTrip([
      {
        destination_id: 'd1',
        destinations: { name: '제주시', province: '제주' },
      },
      {
        destination_id: 'd2',
        destinations: { name: '서귀포시', province: '제주' },
      },
    ]);

    expect(getDestinationNames(trip)).toBe('제주시, 서귀포시');
  });

  it('연결되지 않은 여행지는 제외한다', () => {
    const trip = createTrip([
      {
        destination_id: 'd1',
        destinations: { name: '제주시', province: '제주' },
      },
      { destination_id: 'd2', destinations: null },
    ]);

    expect(getDestinationNames(trip)).toBe('제주시');
  });

  it('여행지가 없으면 빈 문자열을 반환한다', () => {
    expect(getDestinationNames(createTrip([]))).toBe('');
  });
});
