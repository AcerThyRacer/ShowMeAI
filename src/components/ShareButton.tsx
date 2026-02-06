import React from 'react';
import { Share2, Link as LinkIcon, Twitter } from 'lucide-react';
import { useToast } from './Toast';

interface ShareButtonProps {
  title: string;
  text: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, text }) => {
  const { showToast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled share
      }
    } else {
      await copyToClipboard(url);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy link', 'info');
    }
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const t = encodeURIComponent(`${title} — ${text}`);
    window.open(`https://twitter.com/intent/tweet?text=${t}&url=${url}`, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 hover:bg-[var(--accent-color)]/20 transition-all text-sm font-medium"
        aria-label="Share"
      >
        <Share2 size={16} />
        Share
      </button>
      <button
        onClick={() => copyToClipboard(window.location.href)}
        className="p-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)]/50 transition-all"
        aria-label="Copy link"
      >
        <LinkIcon size={16} />
      </button>
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)]/50 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </button>
    </div>
  );
};
