import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useCallback, useState } from 'react';
import styles from './index.module.less';
import 'highlight.js/styles/github-dark.css';

type MarkdownContentProps = {
  content: string;
  loading?: boolean;
};

// 复制按钮组件
const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ''}`}
      onClick={handleCopy}
    >
      {copied ? '已复制' : '复制'}
    </button>
  );
};

const MarkdownContent = ({ content, loading }: MarkdownContentProps) => {
  return (
    <div className={`${styles.markdownBody} ${loading ? styles.streaming : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className;
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code className={styles.inlineCode} {...props}>
                  {children}
                </code>
              );
            }

            // 独立代码块卡片
            return (
              <div className={styles.codeBlockWrapper}>
                <div className={styles.codeBlockHeader}>
                  <span className={styles.codeLang}>{match ? match[1] : 'code'}</span>
                  <CopyButton code={codeString} />
                </div>
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          },
          pre: ({ children }) => {
            return <pre>{children}</pre>;
          },
          table: ({ children }) => (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>{children}</table>
            </div>
          ),
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
          ),
          ul: ({ children }) => (
            <ul className={styles.list}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={styles.list}>{children}</ol>
          ),
          p: ({ children }) => (
            <p className={styles.paragraph}>{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className={styles.heading}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={styles.heading}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={styles.heading}>{children}</h3>
          ),
          a: ({ href, children }) => (
            <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      {loading && content && <span className={styles.cursor} />}
    </div>
  );
};

export default MarkdownContent;
export { MarkdownContent };
