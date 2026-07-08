import { createRouter, createWebHistory } from 'vue-router'
import About from './../views/About.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'About',
			component: About
		},
		{
			path: '/projects',
			name: 'Projects',
			component: () => import('./../views/Projects.vue')
		},
		{
			path: '/projects/:id',
			name: 'ProjectDetails',
			component: () => import('./../views/ProjectDetails.vue')
		},
		{
			path: '/blog',
			name: 'Blog',
			component: () => import('./../views/Blog.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('./../views/errors/NotFound.vue')
		}
	]
});

export default router;
