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
     getNotes: builder.query({
      query: () => 'notes', 
    }),

  getNotesByUserId: builder.query({
    query: (userId) => `/notes/${userId}`,
    }),

  createNote: builder.mutation({
      query: ({  content, colour }) => ({
        url: 'create-note',
        method: 'POST',
        params: {
          content,
          colour,
        },
      }),
    }),
updateNote: builder.mutation({
      query: ({ id,  content, colour, }) => ({
        url: `update-note/${id}`,
        method: 'PUT',
        body: {
          content,
          colour,
    
        },
      }),
    }),
deleteNote: builder.mutation({
      query: (id) => ({
        url:`delete-note/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotesByUserIdQuery,   
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useGetNotesQuery
} = notesApi;
