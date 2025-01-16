export default function ({ $axios, store }) {
    return {
      httpEndpoint: process.env.CMS_GRAPHQL,
      httpLinkOptions: {
        credentials: 'same-origin',
      },
      tokenName: 'apollo-token',
      getAuth: () => `Bearer ${store.state.token}`,
    }
  }
  