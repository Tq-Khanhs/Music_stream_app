import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), 
  endpoints: (builder) => ({
    
    getArtists: builder.query({
      query: () => 'https://my.api.mockaroo.com/artists.json?key=5b678c00',
    }),
    getAlbums: builder.query({
      query: () => 'https://my.api.mockaroo.com/albums.json?key=5b678c00',
    }),
    getCharts: builder.query({
      query: () => 'https://my.api.mockaroo.com/charts.json?key=5b678c00',
    }),
    getTracks: builder.query({
      query: () => 'https://my.api.mockaroo.com/tracks.json?key=5b678c00',
    }),
   
    fetchUsers: builder.query({
      query: () => 'https://6748bf4a5801f5153592092a.mockapi.io/users',
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'https://6748bf4a5801f5153592092a.mockapi.io/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `https://6748bf4a5801f5153592092a.mockapi.io/users/${updatedUser.id}`,
        method: 'PUT', 
        body: updatedUser,
      }),
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetAlbumsQuery,
  useGetChartsQuery,
  useGetTracksQuery,
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = apiSlice;

