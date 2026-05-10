// @ts-nocheck
import { useApiService } from '@/composables/apiService';
import _ from 'lodash';

const api = useApiService();

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      articles: [],
      chat: {},
      infoText: {},
      counties: [],
    };
  },
  getters: {
    categories: (state) => {
      return state.categories;
    },
    categoriesByParentId: (state) => (parentId) => {
      let arr = [];
      if (parentId === null) {
        arr = state.categories.filter((el: any) => el.attributes.parent.data === null);
      } else {
        arr = state.categories.filter((el: any) => el.attributes.parent.data && el.attributes.parent.data.id === parentId);
      }
      arr = _.orderBy(arr, [['attributes.order'], ['asc']]);
      return arr;
    },
    categoryById: (state) => (categoryId) => {
      const category = state.categories.find((el: any) => el.id === categoryId);
      if (category) {
        return category;
      } else {
        return {
          id: categoryId,
          attributes: {
            title: 'Kategori mangler',
            icon: '',
            createdAt: '2022-10-05T12:27:20.255Z',
            updatedAt: '2023-01-03T11:05:00.099Z',
            order: 1,
            parent: {
              data: null,
            },
          },
        };
      }
    },
    contentByParentId: (state, getters) => (parentId) => {
      const categories = getters['categoriesByParentId'](parentId);
      const articles = getters['articlesByCategoryId'](parentId);
      const all = categories.concat(articles);
      return _.orderBy(all, ['attributes.order'], ['asc']);
    },
    articleById: (state) => (articleId) => {
      return state.articles.find((article) => article.id === articleId);
    },
    articlesByCategoryId: (state) => (categoryId) => {
      return state.articles.filter((article: any) => {
        const found = article.attributes.categories.data.find((category: any) => category.id === categoryId);
        if (found !== undefined) {
          return true;
        } else {
          return false;
        }
      });
    },
    articles: (state) => {
      return state.articles;
    },
    chat: (state) => {
      return state.chat;
    },
    chatActive: (state) => {
      let active = false;
      try {
        active = state.chat.attributes.active;
      } catch (err) {
        console.error('Har ingen info om chatten er aktiv eller ikke. Ikke vis.');
      }
      return active;
    },
    infoText: (state) => {
      return state.infoText;
    },
    infoTextOverRecreationalCategory: (state) => {
      return state.infoTextOverRecreationalCategory;
    },
    counties: (state) => {
      const resp = [];
      for (const county of state.counties) {
        resp.push(county.attributes.title);
      }
      return resp;
    },
  },
  actions: {
    onAppStartup: async (context) => {
      // Hent det som er lagret lokalt
      const localStr = localStorage.getItem('content');
      if (localStr) {
        const local = JSON.parse(localStr);
        context.state.categories = local.categories;
        context.state.articles = local.articles;
        context.state.chat = local.chat;
        context.state.infoText = local.infoText;
        context.state.infoTextOverRecreationalCategory = local.infoTextOverRecreationalCategory;
        context.state.counties = local.counties;
      }

      context.dispatch('sync'); // Synkroniser med server
    },
    sync: async (context) => {
      // Oppdater så fra server
      const infoTextOverRecreationalCategory: any = await api.get('infotekst-over-rekreasjonsbruk');
      context.state.infoTextOverRecreationalCategory = infoTextOverRecreationalCategory.data; // Tekst som vises over "Rekreasjonsbruk"-kategorien
      const counties: any = await api.get('fylker?pagination[page]=0&pagination[pageSize]=10000');
      context.state.counties = counties.data; // Vi henter og setter denne først, siden det er content som trengs av onboarding for å starte appen
      const categories: any = await api.get('categories?populate=parent&pagination[page]=0&pagination[pageSize]=10000');
      context.state.categories = categories.data.map((category) => (category = { type: 'category', ...category })); // Legg til 'type' så vi kan skille mellom category og article senere
      const articles: any = await api.get('articles?populate=categories&pagination[page]=0&pagination[pageSize]=10000');
      context.state.articles = articles.data.map((article) => (article = { type: 'article', ...article })); // Legg til 'type' så vi kan skille mellom category og article senere
      const chat: any = await api.get('chat');
      const infoText: any = await api.get('infotext');
      context.state.chat = chat.data;
      context.state.infoText = infoText.data;
      context.dispatch('saveState', context.state);
    },
    syncChat: async (context) => {
      // Denne har en egen sync som kjører på hver app resume. Dette så vi viser/skjuler chat-knappen basert på status fra backend
      const chat: any = await api.get('chat');
      context.state.chat = chat.data;
      context.dispatch('saveState', context.state);
    },
    syncInfoText: async (context) => {
      // Denne har en egen sync som kjører på hver app resume. Dette så vi viser/skjuler info-teksten basert på status fra backend
      const infoText: any = await api.get('infotext');
      context.state.infoText = infoText.data;
      context.dispatch('saveState', context.state);
    },
    syncInfoTextOverRecreationalCategory: async (context) => {
      // Denne har en egen sync som kjører på hver app resume. Dette så vi viser/skjuler info-teksten basert på status fra backend
      const infoText: any = await api.get('infotekst-over-rekreasjonsbruk');
      context.state.infoTextOverRecreationalCategory = infoText.data;
      context.dispatch('saveState', context.state);
    },
    saveState: (context, payload) => {
      localStorage.setItem('content', JSON.stringify(payload)); // Dette innholdet stammer ikke fra brukeren, derfor trenger vi ikke kryptere det eller legge det i Preferences
    },
  },
};
