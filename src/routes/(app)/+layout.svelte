<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte'
	import AppSidebar from '$lib/components/app-sidebar.svelte'
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js'
	import { Separator } from '$lib/components/ui/separator/index.js'
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'

	import { Sun, Moon } from '@lucide/svelte'
	import { mode, toggleMode } from 'mode-watcher'

	let { children } = $props()
</script>

<Sidebar.Provider>
	<AppSidebar />

	<Sidebar.Inset>
		<header
			class="flex h-16 w-full items-center px-4
			transition-[width,height] ease-linear
			group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2">
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="h-4" />

				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link>Portfolio</Breadcrumb.Link>
						</Breadcrumb.Item>

						<Breadcrumb.Separator class="hidden md:block">
							<Breadcrumb.Page>-</Breadcrumb.Page>
						</Breadcrumb.Separator>

						<Breadcrumb.Item>
							<Breadcrumb.Page>Vidi Agung Adhyaksa</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>

			<Button
				variant="ghost"
				size="icon"
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="ml-auto"
			>
				{#if mode.current === 'dark'}
					<Moon class="h-4 w-4 text-foreground" />
				{:else}
					<Sun class="h-4 w-4 text-foreground" />
				{/if}
			</Button>
		</header>

		<div class="flex flex-1 flex-col gap-6 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
