<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar'

	export let user: {
		name: string;
		avatar: string;
		username?: string;
	}
</script>

<div class="flex flex-col items-center gap-2 px-3 py-2">
	<Avatar
		class="
			h-15 w-15
			transition-all duration-200
			group-has-data-[collapsible=icon]/sidebar-wrapper:h-9
			group-has-data-[collapsible=icon]/sidebar-wrapper:w-9
		"
	>
		<AvatarImage src={user.avatar} alt={user.name} />
		<AvatarFallback>
			{user.name.slice( 0, 2 ).toUpperCase()}
		</AvatarFallback>
	</Avatar>

	<div
		class="
			flex flex-col items-center leading-tight
			transition-all duration-200
			group-has-data-[collapsible=icon]/sidebar-wrapper:hidden
		"
	>
		<span class="text-sm font-semibold">
			{user.name}
		</span>

		{#if user.username}
			<span class="text-xs text-muted-foreground">
				@{user.username}
			</span>
		{/if}
	</div>
</div>
