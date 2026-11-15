<template>
	<div class="cvBlock">
		<a
			class="cvButton"
			:href="cvUrl"
			download
			type="application/pdf"
			aria-label="Download CV as PDF"
		>
			Download CV <span class="cvIcon" aria-hidden="true"></span>
		</a>
	</div>
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
	name: "SiteFooter",
	data() {
		return {
			cvUrl: import.meta.env.BASE_URL + "Kristians-Murds-CV.pdf"
		};
	}
};
</script>

<style lang="scss" scoped>
@use "../../styles/_globals" as *;

// Pages that end on a content grid previously ran straight into the viewport
// edge. The generous top and bottom padding here is the point as much as the
// content is — it gives every page a landing space to scroll into.
.cvBlock {
	margin-top: 8vh;
	text-align: center;
}
.siteFooter {
	margin-top: 3vh;
	padding-bottom: 8vh;
}

// Same button as the "Download CV" CTA in the About hero — kept in sync by
// hand since this component's styles are scoped.
.cvButton {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.85rem 1.9rem;

	color: var(--accent);
	font-size: 1rem;
	text-decoration: none;
	white-space: nowrap;

	background: var(--accent-bg);
	border: 1px solid var(--accent-border);
	border-radius: 999px;

	transition: background 0.2s ease, border-color 0.2s ease;

	// No translateY lift here on purpose: shifting the button under a cursor
	// sitting near its edge un-hovers it, snapping it back and re-hovering
	// it — a flicker loop. Color-only hover avoids that.
	&:hover,
	&:focus-visible {
		background: var(--accent-bg-hover);
		border-color: var(--accent);
	}
}
.cvIcon {
	display: inline-block;
	width: 0.95em;
	height: 0.95em;

	// Recolored via mask instead of an <img> so it always matches the
	// button's teal, rather than shipping the icon's own blue.
	background-color: currentColor;
	-webkit-mask: url(../../assets/images/icons/download-arrow.png) center / contain no-repeat;
	mask: url(../../assets/images/icons/download-arrow.png) center / contain no-repeat;
}

.footerRule {
	height: 1px;
	background: var(--line);
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
	color: var(--text-soft);
}

.footerRole {
	color: var(--text-subtle);
}

.footerLinks {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.25rem;

	> a {
		color: var(--text-muted);
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.18s ease;

		&:hover,
		&:focus-visible {
			color: var(--accent);
		}
	}

}
</style>
