<template>
	<footer class="siteFooter">
		<div class="footerRule"></div>
		<div class="footerInner">
			<div class="footerName">
				Kristiāns Murds <span class="footerRole">· Full-Stack &amp; AI Developer</span>
			</div>
			<nav class="footerLinks">
				<a href="mailto:murdskristians@gmail.com">Email</a>
				<a href="https://github.com/murdskristians" target="_blank" rel="noopener">GitHub</a>
				<a
					href="https://www.linkedin.com/in/kristians-murds-ab091384/"
					target="_blank"
					rel="noopener"
					>LinkedIn</a
				>
			</nav>
		</div>
	</footer>
</template>

<script>
export default {
	name: "SiteFooter"
};
</script>

<style lang="scss" scoped>
@use "../../styles/_globals" as *;

// Pages that end on a content grid previously ran straight into the viewport
// edge. The generous top and bottom padding here is the point as much as the
// content is — it gives every page a landing space to scroll into.
.siteFooter {
	margin-top: 8vh;
	padding-bottom: 8vh;
}

.footerRule {
	height: 1px;
	background: rgba(255, 255, 255, 0.1);
}

.footerInner {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	padding-top: 2rem;
	text-align: center;

	@media only screen and (min-width: $breakpoint-m) {
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
	}
}

.footerName {
	font-size: 0.9rem;
	color: #cdd6df;
}

.footerRole {
	color: #7f8c9a;
}

.footerLinks {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.25rem;

	> a {
		color: #9aa7b4;
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.18s ease;

		&:hover,
		&:focus-visible {
			color: #64ffda;
		}
	}
}
</style>
