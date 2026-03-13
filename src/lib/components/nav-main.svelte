<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'
	import { page } from '$app/stores'

	export let items: {
		title: string;
		url: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
	}[]
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>

	<Sidebar.Menu>
		{#each items as item ( item.title )}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					isActive={$page.url.pathname === item.url}
					tooltipContent={item.title}
					class="
					group/menu-button
					group-has-data-[collapsible=icon]/sidebar-wrapper:justify-center
				"
				>
					<a
						href={item.url}
						class="
						flex w-full items-center gap-3
						group-has-data-[collapsible=icon]/sidebar-wrapper:justify-center
					"
					>
						<div class="flex h-9 w-9 items-center justify-center">
							<svelte:component this={item.icon} class="h-4 w-4" />
						</div>
						
						<span class="group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">
							{item.title}
						</span>
					</a>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
