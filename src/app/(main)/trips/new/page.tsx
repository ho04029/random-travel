'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Star } from 'lucide-react';

export default function TravelLogCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    date: '',
    content: '',
    rating: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase 연결
    console.log('Submitted:', formData);
    router.push('/');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">여행기 작성</h1>
      </div>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* 제목 */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="여행기 제목을 입력하세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* 여행지 */}
        {/* TODO 여행지 선택 어떤 식으로 할지 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-gray-900">
              여행지 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">선택하세요</option>
              {/* {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))} */}
            </select>
          </div>

          {/* 방문일 */}
          <div>
            <label className="mb-2 block font-semibold text-gray-900">
              방문일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* 별점 */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">별점</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`size-10 ${
                    star <= formData.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 사진 */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">
            사진 업로드
          </label>
          <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-400">
            <Upload className="mx-auto mb-3 size-12 text-gray-400" />
            <p className="mb-1 text-gray-600">클릭하여 사진을 업로드하세요</p>
            <p className="text-sm text-gray-500">또는 파일을 드래그 앤 드롭</p>
          </div>
        </div>

        {/* 후기 description */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">
            후기 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="여행 후기를 자유롭게 작성해주세요"
            rows={8}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* TODO 친구 */}
        {/* <div>
          <label className="mb-2 block font-semibold text-gray-900">
            함께 간 친구
          </label>
          <div className="flex flex-wrap gap-2">
            {friends.map((friend) => (
              <button
                key={friend.id}
                type="button"
                onClick={() => {}}
                className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                  formData.selectedFriends.includes(friend.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formData.selectedFriends.includes(friend.id) && (
                  <X className="mr-1 inline size-4" />
                )}
                {friend.name}
              </button>
            ))}
          </div>
        </div> */}

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back}
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
