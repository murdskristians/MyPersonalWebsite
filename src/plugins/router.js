import { nextTick } from 'vue'
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

const savedScroll = new Map();

const getScroller = () => document.getElementById('page');

router.beforeEach((to, from) => {
	const el = getScroller();
	if (el && from.name) {
		savedScroll.set(from.fullPath, el.scrollTop);
	}
	return true;
});

router.afterEach((to, from) => {
	const isReturningFromCaseStudy =
		to.name === 'Projects' && from.name === 'ProjectDetails';
	const target = isReturningFromCaseStudy ? savedScroll.get(to.fullPath) || 0 : 0;

	nextTick(() => {
		const el = getScroller();
		if (!el) return;
		el.scrollTop = target;
		requestAnimationFrame(() => {
			if (el.scrollTop !== target) el.scrollTop = target;
		});
	});
});

export default router;
