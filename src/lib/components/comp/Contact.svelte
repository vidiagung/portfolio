<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import { Input } from '$lib/components/ui/input'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Mail, Instagram, LinkedinIcon, Github } from '@lucide/svelte'
</script>

<section class="flex w-full justify-center px-6 pt-8 pb-16">
	<div class="w-full max-w-5xl space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-semibold tracking-tight">Contact Us</h1>

			<p class="mt-2 text-sm text-muted-foreground">Let's get in touch.</p>
		</div>

		<Separator />

		<h2 class="text-center text-lg font-medium">Find me on social media</h2>

		<div class="grid gap-6 md:grid-cols-2">
			<Card
				class="relative overflow-hidden border-0 bg-linear-to-r from-red-600 to-red-700 text-white"
			>
				<CardHeader>
					<h3 class="text-xl font-semibold">Stay in Touch</h3>
					<p class="text-sm text-white/80">Reach out via email for inquiries or collaborations.</p>
				</CardHeader>

				<CardContent>
					<Button
						href="mailto:vidiagung1998@gmail.com?subject=Business Inquiry&body=Hello Vidi,%0D%0A%0D%0AI would like to discuss..."
						variant="secondary"
						>Go to Gmail
					</Button>
				</CardContent>

				<div
					class="absolute top-1/2 right-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20"
				>
					<Mail class="h-8 w-8 text-white" stroke-width="3" />
				</div>
			</Card>

			<Card
				class="relative overflow-hidden border-0 bg-linear-to-r from-pink-500 via-purple-500 to-orange-500 text-white"
			>
				<CardHeader>
					<h3 class="text-xl font-semibold">Follow My Journey</h3>
					<p class="text-sm text-white/80">Follow my creative journey.</p>
				</CardHeader>

				<CardContent>
					<Button href="https://www.instagram.com/vidiagung/" variant="secondary"
						>Go to Instagram
					</Button>
				</CardContent>

				<div
					class="absolute top-1/2 right-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20"
				>
					<Instagram class="h-8 w-8 text-white" stroke-width="3" />
				</div>
			</Card>

			<Card
				class="relative overflow-hidden border-0 bg-linear-to-r from-blue-600 to-blue-800 text-white"
			>
				<CardHeader>
					<h3 class="text-xl font-semibold">Let's Connect</h3>
					<p class="text-sm text-white/80">Connect with me professionally.</p>
				</CardHeader>

				<CardContent>
					<Button
						href="https://www.linkedin.com/in/vidi-agung-adhyaksa-5819a5244/"
						variant="secondary"
						>Go to LinkedIn
					</Button>
				</CardContent>
				<div
					class="absolute top-1/2 right-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20"
				>
					<LinkedinIcon class="h-8 w-8 text-white" stroke-width="3" />
				</div>
			</Card>

			<Card
				class="relative overflow-hidden border-0 bg-linear-to-r from-slate-800 to-slate-900 text-white"
			>
				<CardHeader>
					<h3 class="text-xl font-semibold">Explore the Code</h3>
					<p class="text-sm text-white/80">Explore my open-source work.</p>
				</CardHeader>

				<CardContent>
					<Button href="https://github.com/vidiagung" variant="secondary">Go to Github</Button>
				</CardContent>
				<div
					class="absolute top-1/2 right-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20"
				>
					<Github class="h-8 w-8 text-white" stroke-width="3" />
				</div>
			</Card>
		</div>

		<Separator />

		<div class="space-y-6">
			<h2 class="text-center text-lg font-medium">Send a message below</h2>
			<Card class="border-muted bg-background/50">
				<CardContent class="space-y-6 p-6">
					<!-- First & Last Name -->
					<div class="grid gap-4 md:grid-cols-2">
						<Input
							placeholder="First Name"
							class="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<Input
							placeholder="Last Name"
							class="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<!-- Email Full Width -->
					<Input
						type="email"
						placeholder="Email"
						class="w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
					/>

					<!-- Message -->
					<Textarea
						placeholder="Message"
						class="min-h-35 w-full focus-visible:ring-1 focus-visible:ring-white/10"
					/>

					<!-- Button -->
					<Button class="w-full">Send Message</Button>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
