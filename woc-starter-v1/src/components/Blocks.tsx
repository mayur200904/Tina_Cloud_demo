import type { PageQuery } from '../../tina/__generated__/types';
import HeroBlock from './blocks/HeroBlock';
import ServiceGridBlock from './blocks/ServiceGridBlock';
import ContentSplitBlock from './blocks/ContentSplitBlock';
import StatsBarBlock from './blocks/StatsBarBlock';
import TestimonialCarouselBlock from './blocks/TestimonialCarouselBlock';
import LogoCloudBlock from './blocks/LogoCloudBlock';
import FAQBlock from './blocks/FAQBlock';
import ContactFormBlock from './blocks/ContactFormBlock';
import ProcessBlock from './blocks/ProcessBlock';
import TeamBlock from './blocks/TeamBlock';
import FullWidthImageBlock from './blocks/FullWidthImageBlock';
import PullQuoteBlock from './blocks/PullQuoteBlock';

type Block = NonNullable<NonNullable<PageQuery['page']['blocks']>[number]>;

interface BlocksProps {
    blocks: Block[];
}

export default function Blocks({ blocks }: BlocksProps) {
    return (
        <>
            {blocks.map((block, i) => {
                if (!block) return null;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const typename = (block as any).__typename as string;
                switch (typename) {
                    case 'PageBlocksHero':
                        return <HeroBlock key={i} {...block} />;
                    case 'PageBlocksServiceGrid':
                        return <ServiceGridBlock key={i} {...block} />;
                    case 'PageBlocksContentSplit':
                        return <ContentSplitBlock key={i} {...block} />;
                    case 'PageBlocksStatsBar':
                        return <StatsBarBlock key={i} {...block} />;
                    case 'PageBlocksTestimonialCarousel':
                        return <TestimonialCarouselBlock key={i} {...block} />;
                    case 'PageBlocksLogoCloud':
                        return <LogoCloudBlock key={i} {...block} />;
                    case 'PageBlocksFaq':
                        return <FAQBlock key={i} {...block} />;
                    case 'PageBlocksContactForm':
                        return <ContactFormBlock key={i} {...block} />;
                    case 'PageBlocksProcess':
                        return <ProcessBlock key={i} {...(block as any)} />;
                    case 'PageBlocksTeam':
                        return <TeamBlock key={i} {...(block as any)} />;
                    case 'PageBlocksFullWidthImage':
                        return <FullWidthImageBlock key={i} {...(block as any)} />;
                    case 'PageBlocksPullQuote':
                        return <PullQuoteBlock key={i} {...(block as any)} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}
