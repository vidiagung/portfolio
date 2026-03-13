<script lang="ts" module>
	import TrophyIcon from '@lucide/svelte/icons/trophy'
	import UsersIcon from '@lucide/svelte/icons/users'
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie'
	import FrameIcon from '@lucide/svelte/icons/frame'
	import MapIcon from '@lucide/svelte/icons/map'
	import MessageSquareIcon from '@lucide/svelte/icons/message-square'
	import MailIcon from '@lucide/svelte/icons/mail'
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid'

	// This is sample data.
	const data = {
		user: {
			name: 'Vidi Agung Adhyaksa',
			username: 'vidiagung',
			avatar: '/src/lib/images/vidiagung.png'
		},

		navMain: [
			{
				title: 'Dashboard',
				url: '/',
				icon: LayoutGridIcon,
				isActive: true
			},
			{
				title: 'About Us',
				url: '/about',
				icon: UsersIcon
			},
			{
				title: 'Achievements',
				url: '/achievement',
				icon: TrophyIcon
			},
			{
				title: 'Contact',
				url: '/contact',
				icon: MailIcon
			},
			{
				title: 'Chat Room',
				url: '/chat',
				icon: MessageSquareIcon
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: FrameIcon
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPieIcon
			},
			{
				name: 'Travel',
				url: '#',
				icon: MapIcon
			}
		]
	}
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte'
	import NavProjects from './nav-projects.svelte'
	import NavUser from './nav-user.svelte'
	import TeamSwitcher from './team-switcher.svelte'
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'
	import type { ComponentProps } from 'svelte'

	let {
		ref = $bindable( null ),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props()
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher user={data.user} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer class="group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
