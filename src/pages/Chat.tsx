import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMessages, useSendMessage } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessageSkeleton } from '@/components/LoadingSkeleton';
import { cn } from '@/lib/utils';

const Chat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  
  const { data: messages, isLoading } = useMessages(conversationId || null);
  const sendMessage = useSendMessage();

  const handleSend = async () => {
    if (!message.trim() || !conversationId) return;
    
    await sendMessage.mutateAsync({ conversationId, content: message });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">Chat with Provider</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {isLoading ? (
          <>
            <ChatMessageSkeleton />
            <ChatMessageSkeleton isOwn />
            <ChatMessageSkeleton />
          </>
        ) : messages?.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            Start your conversation
          </div>
        ) : (
          messages?.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.sender_id === user?.id ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                'max-w-[75%] rounded-2xl px-4 py-2',
                msg.sender_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
              )}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
