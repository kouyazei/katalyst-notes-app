<script>
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import 'highlight.js/styles/github.css';
	import hljs from 'highlight.js';

	export let data;

	marked.setOptions({
		highlight: function (code, lang) {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(code, { language: lang }).value;
			}
			return hljs.highlightAuto(code).value;
		}
	});

	$: html = marked(data.content);
</script>

<div class="layout">
	<aside>
		<nav>
			<ul>
				{#each data.tree as item}
					<li>
						<a href="/{item.path}" class:active={item.path === $page.params.path}>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<main>
		<article>
			{@html html}
		</article>
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 250px 1fr;
		gap: 2rem;
		height: 100%;
	}

	aside {
		background: #f9f9f9;
		border-right: 1px solid #eee;
		padding: 1rem;
		height: 100vh;
	}

	nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	nav a {
		display: block;
		padding: 0.5rem;
		color: #333;
		text-decoration: none;
		border-radius: 4px;
	}

	nav a:hover {
		background: #eee;
	}

	nav a.active {
		background: #e0e0e0;
		font-weight: bold;
	}

	main {
		padding: 2rem;
		max-width: 900px;
		margin: 0 auto;
	}

	article :global(pre) {
		background: #f6f8fa;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}

	article :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	article :global(h1) {
		margin-top: 0;
	}

	article :global(img) {
		max-width: 100%;
		height: auto;
	}
</style>