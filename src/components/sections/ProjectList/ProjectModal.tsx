import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import type { Project } from '@/services/content'
import { bem } from '@/utils/bem'
import styles from './ProjectModal.module.scss'

const b = bem(styles, 'project-modal')
const TITLE_ID = 'project-modal-title'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal open={project !== null} onClose={onClose} labelledBy={TITLE_ID}>
      {project && (
        <>
          <div className={b('heading')}>
            <p className={b('eyebrow')}>Project details</p>
            <h3 id={TITLE_ID} className={b('title')}>
              {project.title}
            </h3>
          </div>

          <p className={b('description')}>{project.description}</p>

          <div className={b('highlights')}>
            <p className={b('highlights-title')}>Key highlights:</p>
            <ul className={b('highlights-list')}>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={b('actions')}>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {project.links.demo && (
              <Button href={project.links.demo} target="_blank" rel="noopener noreferrer">
                Open demo
                <SquareArrowOutUpRight aria-hidden="true" />
                <span className="visually-hidden">(opens in a new tab)</span>
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  )
}
