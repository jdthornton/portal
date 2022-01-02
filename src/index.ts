import { useEffect, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  children: ReactNode;
  node?: HTMLElement;
}

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export default function Portal ({
  children,
  node
}: PortalProps) {

  const el = useMemo(() => node || (canUseDOM() ? document?.createElement("div") : null), [node]);

  useEffect(() => {
    if(canUseDOM() && el){
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      }
    }
  }, [el]);

  if(!canUseDOM() || !el){
    return null;
  }
  return createPortal(children, el);
}
