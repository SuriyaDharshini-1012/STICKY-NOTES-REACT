import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constant/index';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: ({ title, content, colour, isPinned }) => ({
        url: 'create-note',
        method: 'POST',
        params: {
          title,
          content,
          colour,
          isPinned,
        },
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, title, content, colour, isPinned }) => ({
        url: `update-note/${id}`,
        method: 'PUT',
        body: {
          title,
          content,
          colour,
          isPinned,
        },
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `delete-note/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = notesApi;
