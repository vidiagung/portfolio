<script lang="ts">
	import Chat from '$lib/components/comp/Chat.svelte'

	const { data } = $props()
</script>

<Chat {data} />
