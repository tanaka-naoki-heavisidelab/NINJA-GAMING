<!--loadの引数が更新されていたため、レッスンのコードは無効。
	https://www.linkedin.com/pulse/fix-sveltekit-breaking-change-load-january-2022-tim-sonner
[iid].svelteとparams.iidが繋がる。iidをabcに変えても良い。
tsを有効にしているため、viteのアライアスを手で追記する必要があった。
https://github.com/sveltejs/kit/issues/2199

svelte.config.js
	kit: {
		vite: {
			resolve: {
				alias: {
					$src: path.resolve('./src')
				}
			}
		},
		adapter: adapter()
	}

tsconfig.json
"compilerOptions": {
		"paths": {
		  "$src/*": ["src/*"],
		  "$lib":["src/lib"],
		  "$lib/*":["src/lib/*"]
		}
	  }

Promiseでわざと遅らせるが、アンカーにprefetchを設定したのでマウスカーソルが上に来ただけで
フェッチされる。F12画面のnetworkで挙動が確認できる。

__error.svelteとindex.svelteにreturn errorがあれば、このsvelteにerrorが無くても表示される。
	-->
<script context="module">
	export async function load({ params, fetch }) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const url = `https://jsonplaceholder.typicode.com/posts/${params.iid}`;
		const res = await fetch(url); // get the response returns a promise, so we await
		const guide = await res.json(); // get data from the response, return it as json

		if (res.ok) {
			return {
				props: {
					guide
				}
			};
		}

		/* 		return {
			status: res.status,
			error: new Error('Could not fetch that guide')
				status: 301,
			redirect: '/guides' 
		};*/
	}
</script>

<script>
	export let guide;
</script>

<div class="guide">
	<h2>{guide.title}</h2>
	<p>{guide.body}</p>
</div>

<style>
	.guide {
		margin-top: 40px;
		padding: 10px;
		border: 1px dotted rgba(255, 255, 255, 0.2);
	}
</style>
