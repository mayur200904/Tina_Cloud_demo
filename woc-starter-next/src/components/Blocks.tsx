import type { PageQuery } from '../../tina/__generated__/types';
import HeroBlock from './blocks/HeroBlock';
import ServiceGridBlock from './blocks/ServiceGridBlock';
import ContentSplitBlock from './blocks/ContentSplitBlock';
import StatsBarBlock from './blocks/StatsBarBlock';
import TestimonialCarouselBlock from './blocks/TestimonialCarouselBlock';
import LogoCloudBlock from './blocks/LogoCloudBlock';
import FAQBlock from './blocks/FAQBlock';
import ContactFormBlock from './blocks/ContactFormBlock';

type Block = NonNullable<NonNullable<PageQuery['page']['blocks']>[number]>;

interface BlocksProps {
    blocks: Block[];
}

export default function Blocks({ blocks }: BlocksProps) {
    return (
        <>
            {blocks.map((block, i) => {
                if (!block) return null;
                switch (block.__typename) {
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
                    default:
                        return null;
                }
            })}
        </>
    );
}
