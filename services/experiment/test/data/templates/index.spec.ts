import { TemplateRepository } from '../../../src/database/repositories/template';
import { example_template } from './example_template.spec';
import { EntityData } from '@crosslab/service-common/test-helper';

export const templateNames = ['example template'] as const;
export type TemplateName = (typeof templateNames)[number];
export type TemplateData = Record<TemplateName, EntityData<TemplateRepository>>;

export const templateData: TemplateData = {
    'example template': { ...example_template },
};
