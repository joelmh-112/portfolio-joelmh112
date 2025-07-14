/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		subdomain: string | null;
		siteTitle: string;
	}
}