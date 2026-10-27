export interface LedgerNewsItem {
    id: string;
    categoryTag: string;
    headline: string;
    dateString: string;
    subHeadline: string;
    paragraph: string;
    ctaText: string;
    ctaLink: string;
    isExternal?: boolean;
}

export const ledgerNewsItems: LedgerNewsItem[] = [
    {
        id: 'audible-winter-offer-2026',
        categoryTag: 'CREDIT HACK',
        headline: 'The 99p Audible Winter Offer is Live',
        dateString: 'TUES OCT 27th | 2026',
        subHeadline: 'Secure 3 months of audio for less than a cup of coffee.',
        paragraph: 'Audible UK is currently running their promotional offer giving eligible new (or returning "cooled off") members 3 months of the Standard membership for just 99p a month. The offer runs until December 17, 2026, providing the perfect window to bag your winter heavyweights',
        ctaText: 'Read our strategy guide on how to maximize this offer →',
        ctaLink: '/journal/how-to-squeeze-every-drop-of-value-out-of-your-audible-credits-and-free-trials/'
    },
    {
        id: 'acotar-book-6-announcement',
        categoryTag: 'NEW RELEASE',
        headline: 'The Return to the Night Court',
        dateString: 'TUES OCT 27th | 2026',
        subHeadline: 'Sarah J. Maas releases ACOTAR Book 6',
        paragraph: "The wait is over for romantasy devotees. Sarah J. Maas's highly anticipated sixth installment in the A Court of Thorns and Roses saga, A Court of Splintered Harmony, has officially dropped today, October 27, 2026. Available in both a 12-hour solo narration by Elizabeth Evans and a 10-hour full-cast dramatization, it's an essential credit spend.",
        ctaText: 'Read our review of A Court of Splintered Harmony →',
        ctaLink: '/book/a-court-of-splintered-harmony-sarah-j-maas/'
    },
    {
        id: 'rebecca-yarros-threshing-day',
        categoryTag: 'NEW RELEASE',
        headline: 'The Empyrean Saga Expands',
        dateString: 'TUES OCT 27th | 2026',
        subHeadline: 'Rebecca Yarros drops Threshing Day, but Book 4 remains TBA.',
        paragraph: 'While the internet continues to relentlessly speculate on the release date for Book 4 of the Empyrean series, Rebecca Yarros has surprised fans with Threshing Day. Released late last month, this new audiobook features 13 standalone stories focused on familiar characters and the day their dragon bonds began.',
        ctaText: 'Revisit our review of Onyx Storm to prepare →',
        ctaLink: '/book/onyx-storm-rebecca-yarros/'
    }
];
