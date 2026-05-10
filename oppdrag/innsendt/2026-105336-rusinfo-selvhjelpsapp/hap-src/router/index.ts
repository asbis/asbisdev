import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: '/',
    redirect: '/onboarding',
  },
  {
    path: '/onboarding',
    component: () => import('@/views/Onboarding.vue'),
    beforeEnter: (to, from, next) => {
      // @ts-ignore
      if (window.programStartedAt) {
        next('/tabs');
      } else {
        next();
      }
    },
  },
  {
    path: '/tabs/',
    component: TabsPage,
    beforeEnter: (to, from, next) => {
      // @ts-ignore
      if (window.programStartedAt) {
        next();
      } else {
        next('/onboarding');
      }
    },
    children: [
      {
        path: '',
        redirect: '/tabs/home',
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'diary',
        component: () => import('@/views/Diary.vue'),
      },
      {
        path: 'stats',
        component: () => import('@/views/Stats.vue'),
      },
      {
        path: 'awards',
        component: () => import('@/views/Awards.vue'),
      },
      {
        path: 'awards/upcoming',
        component: () => import('@/views/AwardsUpcoming.vue'),
      },
      {
        path: 'info',
        component: () => import('@/views/Info.vue'),
      },
      {
        path: 'info/:backButtonText/category/:categoryId',
        component: () => import('@/views/Category.vue'),
        props: true,
      },
      {
        path: 'info/:backButtonText/article/:articleId',
        component: () => import('@/views/Article.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
