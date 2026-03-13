<script lang="ts">
	import { Separator } from '$lib/components/ui/separator'
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Button } from '$lib/components/ui/button'

	type Certificate = {
		code: string;
		title: string;
		provider: string;
		preview: string;
		url: string;
		tags: string[];
		issued: string;
	};

	const certificates: Certificate[] = [
		{
			code: 'TYK-PRAC-2026',
			title: 'Tyk Practitioner Certificate',
			provider: 'Tyk Technologies',
			preview: '/src/lib/images/certificate/certificate.PNG',
			url: 'https://www.tyk.io/certification/tyk-practitioner-certificate/',
			tags: ['API Management', 'Tyk', 'Practitioner'],
			issued: 'February 2026'
		},
		{
			code: 'fcc-legacy-js-algo-v8',
			title: 'Legacy JavaScript Algorithms and Data Structures V8',
			provider: 'FreeCodeCamp',
			preview: '/src/lib/images/certificate/freecodecamp.png',
			url: 'https://www.freecodecamp.org/certification/fcc-d5a58f6e-0956-4447-a261-ab781c80c4f0/javascript-algorithms-and-data-structures-v8',
			tags: ['JavaScript', 'Algorithms', 'Data Structures'],
			issued: 'March 2026'
		},
		{
			code: 'fcc-frontend-dev-lib-v8',
			title: 'Front-End Development Libraries V8',
			provider: 'FreeCodeCamp',
			preview: '/src/lib/images/certificate/front-end-development.png',
			url: 'https://www.freecodecamp.org/certification/fcc-d5a58f6e-0956-4447-a261-ab781c80c4f0/front-end-development-libraries',
			tags: ['Frontend', 'React', 'Redux', 'JavaScript'],
			issued: 'March 2026'
		}
	]

	let selected: Certificate | null = null
	let open = false

	function openDialog( cert: Certificate ) {
		selected = cert
		open = true
	}
</script>

<section class="flex w-full justify-center px-6 pt-8 pb-16">
	<div class="w-full max-w-5xl space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-semibold tracking-tight">Achievements</h1>
			<p class="mt-2 text-sm text-muted-foreground">
				A curated showcase of certifications and industry-recognized credentials reflecting my
				continuous professional growth.
			</p>
		</div>
		<Separator class="mx-auto mt-6 w-40" />
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each certificates as cert ( cert.code )}
				<Card
					class="group overflow-hidden border-border/40 bg-background/60 backdrop-blur transition hover:shadow-xl"
				>
					<!-- THUMBNAIL — klik buka dialog -->
					<button
						type="button"
						class="block w-full cursor-pointer"
						on:click={() => openDialog( cert )}
					>
						<div class="relative aspect-4/3 w-full overflow-hidden">
							<img
								src={cert.preview}
								alt={cert.title}
								class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
							/>
							<div
								class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
							>
								<span class="text-sm font-medium text-white">View Certificate</span>
							</div>
						</div>
					</button>

					<CardHeader class="space-y-1">
						<p class="text-xs tracking-widest text-muted-foreground">{cert.code}</p>
						<h3 class="text-base leading-snug font-semibold">{cert.title}</h3>
						<p class="text-sm text-muted-foreground">{cert.provider}</p>
					</CardHeader>

					<CardContent class="space-y-4">
						<div class="flex flex-wrap gap-2">
							{#each cert.tags as tag ( tag )}
								<Badge variant="secondary">{tag}</Badge>
							{/each}
						</div>
						<p class="text-xs tracking-wide text-muted-foreground">
							ISSUED ON {cert.issued.toUpperCase()}
						</p>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>

<!-- Dialog sertifikat -->
<Dialog.Root bind:open>
	<Dialog.Content class="w-[90vw]! max-w-5xl! gap-0 overflow-hidden p-0">
		{#if selected}
			<Dialog.Header class="px-6 pt-6 pb-4">
				<Dialog.Title>{selected.title}</Dialog.Title>
				<Dialog.Description>{selected.provider} · Issued {selected.issued}</Dialog.Description>
			</Dialog.Header>

			<!-- Gambar sertifikat -->
			<div class="px-6">
				<img
					src={selected.preview}
					alt={selected.title}
					class="max-h-[65vh] w-full rounded-lg border border-border object-contain"
				/>
			</div>

			<!-- Footer dialog -->
			<div class="flex items-center justify-between px-6 py-4">
				<div class="flex flex-wrap gap-2">
					{#each selected.tags as tag ( tag )}
						<Badge variant="secondary">{tag}</Badge>
					{/each}
				</div>
				<Button
					variant="outline"
					size="sm"
					href={selected.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					View Certificate ↗
				</Button>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
