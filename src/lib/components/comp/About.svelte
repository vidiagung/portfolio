<script lang="ts">
	import { Separator } from '$lib/components/ui/separator'
	import { Card, CardHeader } from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import { Briefcase, GraduationCap } from '@lucide/svelte'
</script>

<section class="flex w-full justify-center px-6 pt-8 pb-16">
	<div class="w-full max-w-3xl">
		<h1 class="text-center text-3xl font-semibold tracking-tight">About Us</h1>

		<p class="mt-2 text-center text-sm text-muted-foreground">A brief introduction to who I am.</p>

		<Separator class="mx-auto mt-6 w-40" />

		<div
			class="mt-8 space-y-6 text-justify text-[15px] leading-7 [hyphens:auto] text-foreground/90"
		>
			<p>
				I'm <span class="font-semibold text-foreground">Vidi Agung Adhyaksa</span>, a Curup-based
				Software Engineer dedicated to building impactful digital solutions. I specialize in
				developing web platforms and mobile applications using a modern tech stack, including
				<span class="font-medium">SvelteKit</span>,
				<span class="font-medium">NextJS</span>,
				<span class="font-medium">PHP</span>,
				<span class="font-medium">CodeIgniter</span>,
				<span class="font-medium">TypeScript</span>, and native Android development with
				<span class="font-medium">Tauri</span>,
				<span class="font-medium">Kotlin</span>.
			</p>

			<p>
				My primary focus is crafting software architecture that doesn't just work but is
				well-structured, maintainable, and scalable to meet business needs. I believe that
				high-quality code must go hand-in-hand with system efficiency and logical clarity.
			</p>

			<p>
				I blend technical expertise with proactive communication, critical thinking, and effective
				time management. I thrive in collaborative environments and leverage leadership skills to
				ensure every project delivers optimal results and real-world impact.
			</p>
		</div>

		<div class="mt-10">
			<p class="text-sm text-muted-foreground">Best regards,</p>
			<p class="mt-3 text-3xl font-bold tracking-wide text-foreground/90 italic">
				Vidi Agung Adhyaksa
			</p>
		</div>

		<Separator class="mx-auto mt-3 w-40" />
	</div>
</section>
<section class="flex w-full justify-center">
	<div class="w-full max-w-3xl">
		<h2 class="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight">
			<Briefcase class="relative top-px h-6 w-6" />
			<span>Career</span>
		</h2>

		<p class="mt-2 text-center text-sm text-muted-foreground">My Freelancer Journey.</p>

		<div class="mt-10 space-y-6">
			<Card>
				<CardHeader class="pb-2">
					<div class="flex items-center gap-6">
						<img
							src="src/lib/images/career/playersloot.png"
							alt="Players Loot"
							class="h-20 w-20 object-contain"
						/>

						<div class="space-y-1">
							<h3 class="text-lg font-semibold">Playersloot</h3>

							<p class="text-sm text-muted-foreground">Fullstack Developer · PHP · Marketplace</p>

							<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span>Jan 2023 – Feb 2024</span>
								<span>•</span>
								<span>1 Year</span>
								<span>•</span>
								<Badge variant="outline">Remote</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader class="pb-2">
					<div class="flex items-center gap-6">
						<img
							src="src/lib/images/career/littleproject.png"
							alt="Little Project"
							class="h-20 w-20 object-contain"
						/>

						<div class="space-y-1">
							<h3 class="text-lg font-semibold">Little Project</h3>

							<p class="text-sm text-muted-foreground">Fullstack Developer · PHP · Bandung, Indonesia</p>

							<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span>Jul 2025 – Sep 2025</span>
								<span>•</span>
								<span>5 Months</span>
								<span>•</span>
								<Badge variant="outline">Remote</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader class="pb-2">
					<div class="flex items-center gap-6">
						<img
							src="src/lib/images/career/indonesiapeduli.png"
							alt="Indonesia Peduli"
							class="h-20 w-20 object-contain"
						/>

						<div class="space-y-1">
							<h3 class="text-lg font-semibold">Yayasan Indonesia Peduli</h3>

							<p class="text-sm text-muted-foreground">Front-End Developer · SvelteKit · Bandung, Indonesia</p>

							<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span>Sep 2025 – April 2026</span>
								<span>•</span>
								<span>6 Months</span>
								<span>•</span>
								<Badge variant="outline">Remote</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>
		</div>
	</div>
</section>
<section class="mt-12 flex w-full justify-center">
	<div class="w-full max-w-3xl">
		<h2 class="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight">
			<GraduationCap class="relative top-px h-8 w-8" />
			<span>Education</span>
		</h2>
		<p class="mt-2 text-center text-sm text-muted-foreground">My Educational Journey.</p>

		<div class="mt-10 space-y-6">
			<Card>
				<CardHeader>
					<div class="flex items-center gap-6">
						<img
							src="src/lib/images/UMB.png"
							alt="Universitas Muhammadiyah Bengkulu"
							class="h-20 w-20 object-contain"
						/>

						<div class="space-y-1">
							<h3 class="text-lg font-semibold">Universitas Muhammadiyah Bengkulu</h3>

							<p class="text-sm text-muted-foreground">
								Bachelor's degree · Sociology (S.Sos) · GPA 3.10/4.00
							</p>

							<p class="text-sm text-muted-foreground">2017 – 2021 · Bengkulu, Indonesia 🇮🇩</p>
						</div>
					</div>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<div class="flex items-center gap-6">
						<img
							src="src/lib/images/SMK.png"
							alt="Universitas Muhammadiyah Bengkulu"
							class="h-20 w-20 object-contain"
						/>

						<div class="space-y-1">
							<h3 class="text-lg font-semibold">SMK Negeri 1 Curup</h3>

							<p class="text-sm text-muted-foreground">Senior High School · Science</p>

							<p class="text-sm text-muted-foreground">2013 – 2016 · Curup, Indonesia 🇮🇩</p>
						</div>
					</div>
				</CardHeader>
			</Card>
		</div>
	</div>
</section>
