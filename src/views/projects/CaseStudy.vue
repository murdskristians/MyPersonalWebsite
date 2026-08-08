<template>
	<div class="caseStudy" v-if="data">
		<GridContainer>
			<GridRow>
				<GridCol :small="12" :medium="10" :mediumStart="2">
					<router-link class="backTop" :to="{ name: 'Projects' }">← Back to projects</router-link>

					<h1 id="projectTitle">{{ data.title }}</h1>

					<div class="tags" v-if="data.tags && data.tags.length">
						<span class="tag" v-for="t in data.tags" :key="t">{{ t }}</span>
					</div>

					<p class="lede" v-if="data.lede">{{ data.lede }}</p>

					<div class="accentRule"></div>

					<div class="actions" v-if="data.live || data.source">
						<a
							v-if="data.live"
							class="btn btn--primary"
							:href="data.live"
							target="_blank"
							rel="noopener noreferrer"
						>Try it live →</a>
						<a
							v-if="data.source"
							class="btn"
							:href="'https://github.com/murdskristians/' + data.source"
							target="_blank"
							rel="noopener noreferrer"
						>View source</a>
					</div>

					<dl class="meta" v-if="data.meta">
						<div><dt>Role</dt><dd>{{ data.meta.role }}</dd></div>
						<div><dt>Type</dt><dd>{{ data.meta.type }}</dd></div>
						<div><dt>Status</dt><dd>{{ data.meta.status }}</dd></div>
					</dl>

					<section v-if="data.overview && data.overview.length">
						<h2 class="kicker">Overview</h2>
						<p v-for="(p, i) in data.overview" :key="'ov' + i">{{ p }}</p>
					</section>

					<section v-if="data.architecture && data.architecture.length">
						<h2 class="kicker">Architecture</h2>
						<div class="arch">
							<div class="card" v-for="(a, i) in data.architecture" :key="'ar' + i">
								<span class="role">{{ a.role }}</span>
								<h3><span class="dot"></span>{{ a.title }}</h3>
								<p>{{ a.body }}</p>
							</div>
						</div>
					</section>

					<section v-if="data.highlights && data.highlights.length">
						<h2 class="kicker">Engineering highlights</h2>
						<div class="highlights">
							<div class="hl" v-for="(h, i) in data.highlights" :key="'hl' + i">
								<h4>{{ h.title }}</h4>
								<p>{{ h.body }}</p>
							</div>
						</div>
					</section>

					<section v-if="data.stack && data.stack.length">
						<h2 class="kicker">Tech stack</h2>
						<div class="stack">
							<div v-for="(g, i) in data.stack" :key="'st' + i">
								<h3 class="stackHead">{{ g.group }}</h3>
								<div class="chips">
									<span class="chip" v-for="item in g.items" :key="item">{{ item }}</span>
								</div>
							</div>
						</div>
					</section>

					<router-link class="backLink" :to="{ name: 'Projects' }">← Back to projects</router-link>

					<site-footer />
				</GridCol>
			</GridRow>
		</GridContainer>
	</div>
</template>

<script>
import { SiteFooter } from "@/components/page/";

export default {
	name: "CaseStudy",
	components: {
		SiteFooter
	},
	props: {
		data: {
			type: Object,
			default: null
		}
	},
	mounted: function() {
		this.$st.CurPage = this;
	}
};
</script>

<style lang="scss">
@use "../../styles/_globals" as *;

$cs-teal: #64ffda;
$cs-teal-2: #1de9b6;
$cs-panel: rgba(40, 48, 58, 0.72);
$cs-panel-2: rgba(52, 62, 74, 0.6);
$cs-line: rgba(255, 255, 255, 0.1);
$cs-ink: #e9eef3;
$cs-muted: #9aa7b4;

.caseStudy {
	.backTop {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 1.4rem;
		color: $cs-muted;
		text-decoration: none;
		font-size: 0.85rem;
		transition: color 0.18s ease;

		&:hover { color: $cs-teal; }
		&:focus-visible { outline: 2px solid $cs-teal; outline-offset: 3px; }
	}

	#projectTitle {
		margin: 0;
		font-size: 2.2rem;
		text-align: left;

		@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
			font-size: 3.6rem;
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.tag {
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: $cs-teal;
		border: 1px solid rgba(100, 255, 218, 0.35);
		border-radius: 999px;
		padding: 0.28rem 0.7rem;
	}

	.lede {
		max-width: 60ch;
		margin: 1.2rem 0 0;
		font-size: 1.15rem;
		color: $cs-muted;
		text-align: left;
	}

	.accentRule {
		width: 64px;
		height: 3px;
		margin: 1.6rem 0 0;
		background: $cs-teal;
		border-radius: 2px;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 1.8rem;
	}
	.btn {
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		text-decoration: none;
		padding: 0.7rem 1.3rem;
		border-radius: 8px;
		border: 1px solid $cs-line;
		color: $cs-ink;
		transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease, transform 0.18s ease;

		&:hover { transform: translateY(-2px); }
		&:focus-visible { outline: 2px solid $cs-teal; outline-offset: 3px; }
	}
	.btn--primary {
		border-color: rgba(100, 255, 218, 0.5);
		color: $cs-teal;
		&:hover { background: rgba(100, 255, 218, 0.12); }
	}

	.meta {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		margin: 2.6rem 0 0;
		background: $cs-line;
		border: 1px solid $cs-line;
		border-radius: 12px;
		overflow: hidden;

		> div { background: $cs-panel; padding: 1rem 1.2rem; }
		dt {
			margin: 0 0 0.35rem;
			font-size: 0.66rem;
			letter-spacing: 0.14em;
			text-transform: uppercase;
			color: $cs-muted;
		}
		dd { margin: 0; font-weight: 600; font-size: 0.95rem; color: $cs-ink; }
	}

	section { margin-top: 3.2rem; }

	.kicker {
		margin: 0 0 1rem;
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: $cs-teal-2;
		text-align: left;
	}

	section > p {
		max-width: 68ch;
		margin: 0 0 1rem;
		color: #cdd6df;
		text-align: left;
	}

	.arch {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	.card {
		background: $cs-panel;
		border: 1px solid $cs-line;
		border-radius: 14px;
		padding: 1.4rem;
		text-align: left;

		.role {
			font-size: 0.66rem;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: $cs-teal;
		}
		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: 0.2rem 0 0;
			font-size: 1.05rem;
			text-align: left;
		}
		p { margin: 0.7rem 0 0; font-size: 0.92rem; color: $cs-muted; text-align: left; }
	}
	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: $cs-teal;
		box-shadow: 0 0 12px $cs-teal;
		flex: none;
	}

	.highlights {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.hl {
		background: $cs-panel;
		border: 1px solid $cs-line;
		border-left: 3px solid $cs-teal;
		border-radius: 0 12px 12px 0;
		padding: 1.1rem 1.3rem;
		text-align: left;

		h4 { margin: 0 0 0.35rem; font-size: 0.98rem; text-align: left; }
		p { margin: 0; font-size: 0.88rem; color: $cs-muted; text-align: left; }
	}

	.stack {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem 2rem;
	}
	.stackHead {
		margin: 0 0 0.7rem;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: $cs-muted;
		text-align: left;
	}
	.chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
	.chip {
		font-size: 0.76rem;
		background: $cs-panel-2;
		border: 1px solid $cs-line;
		color: #d4dde6;
		border-radius: 999px;
		padding: 0.32rem 0.72rem;
	}

	.backLink {
		display: inline-block;
		margin-top: 3.4rem;
		color: $cs-muted;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.18s ease;

		&:hover { color: $cs-teal; }
	}

	@media only screen and (max-width: 720px) {
		.meta, .arch, .highlights, .stack { grid-template-columns: 1fr; }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn, .backLink { transition: none; }
	}
}
</style>
