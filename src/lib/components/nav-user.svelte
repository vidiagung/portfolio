<script lang="ts">
	export let user: {
		name: string;
	}
</script>

<div
	class="
		pointer-events-none! visible! block w-full
		px-3
		py-2
		text-center
		opacity-100!
	"
>
	<span class="block text-sm font-medium text-foreground">
		Copyright &copy; {new Date().getFullYear()}
	</span>

	<span class="block text-sm font-medium text-foreground">
		{user.name}
	</span>
</div>
