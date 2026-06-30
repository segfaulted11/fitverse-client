"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";

export default function ForumPostDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

const [replyingTo, setReplyingTo] = useState(null);
const [replyText, setReplyText] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const postRes = await axiosInstance.get(`/api/forum/${id}`);
      setPost(postRes.data.post);

      const voteRes = await axiosInstance.get(`/api/forum/${id}/votes`);

      setLikes(voteRes.data.likes);
      setDislikes(voteRes.data.dislikes);

      const commentRes = await axiosInstance.get(`/api/forum/${id}/comments`);

      setComments(commentRes.data.comments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type) => {
    try {
      await axiosInstance.post(`/api/forum/${id}/vote`, {
        type,
      });

      toast.success(`You ${type}d this post.`);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Already voted.");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axiosInstance.post(`/api/forum/${id}/comments`, {
        text: commentText,
      });

      toast.success("Comment added.");

      setCommentText("");
      loadData();
    } catch (error) {
      toast.error("Couldn't add comment.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(`/api/forum/comments/${commentId}`);

      toast.success("Comment deleted.");
      loadData();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleEdit = async (commentId) => {
    try {
      await axiosInstance.patch(`/api/forum/comments/${commentId}`, {
        text: editingText,
      });

      toast.success("Comment updated.");

      setEditingId(null);
      setEditingText("");

      loadData();
    } catch {
      toast.error("Update failed.");
    }
  };

  const handleReply = async (parentId) => {
  if (!replyText.trim()) return;

  try {
    await axiosInstance.post(
      `/api/forum/${id}/reply`,
      {
        text: replyText,
        parentId,
      }
    );

    toast.success("Reply added.");

    setReplyText("");
    setReplyingTo(null);

    loadData();
  } catch {
    toast.error("Couldn't reply.");
  }
};

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="py-20 text-center">Post not found.</div>;
  }

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <img
          src={post.image}
          alt={post.title}
          className="mb-8 h-96 w-full rounded-xl object-cover"
        />

        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

        <p className="mb-2">
          <strong>Author:</strong> {post.author}
        </p>

        <div className="prose mb-10 max-w-none">
          {" "}
          {post.content && (
            <p className="text-lg font-bold"> {post.content} </p>
          )}{" "}
          {post.description && <p>{post.description}</p>}{" "}
        </div>

        <div className="mb-10 flex gap-4">
          <button
            className="btn btn-success"
            onClick={() => handleVote("like")}
          >
            👍 Like ({likes})
          </button>

          <button
            className="btn btn-error"
            onClick={() => handleVote("dislike")}
          >
            👎 Dislike ({dislikes})
          </button>
        </div>

        <div className="divider"></div>

        <h2 className="mb-4 text-2xl font-bold">Comments</h2>

        <textarea
          className="textarea textarea-bordered w-full"
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />

        <button className="btn btn-primary mt-4" onClick={handleComment}>
          Post Comment
        </button>

        <div className="mt-8 space-y-4">
{comments
  .filter((comment) => comment.parentId === null)
  .map((comment) => (

    <div
      key={comment._id}
      className="rounded-xl border p-4"
    >

      <p className="font-semibold">
        {comment.author}
      </p>

      {editingId === comment._id ? (
        <>
          <textarea
            className="textarea textarea-bordered mt-2 w-full"
            value={editingText}
            onChange={(e) =>
              setEditingText(e.target.value)
            }
          />

          <button
            className="btn btn-success mt-2"
            onClick={() =>
              handleEdit(comment._id)
            }
          >
            Save
          </button>
        </>
      ) : (
        <p className="mt-2">
          {comment.text}
        </p>
      )}

      <div className="mt-4 flex gap-2">

        <button
          className="btn btn-info btn-sm"
          onClick={() =>
            setReplyingTo(comment._id)
          }
        >
          Reply
        </button>

        {user?.email === comment.author &&
          editingId !== comment._id && (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  setEditingId(comment._id);
                  setEditingText(comment.text);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-error btn-sm"
                onClick={() =>
                  handleDelete(comment._id)
                }
              >
                Delete
              </button>
            </>
          )}

      </div>

      {replyingTo === comment._id && (

        <div className="mt-4">

          <textarea
            className="textarea textarea-bordered w-full"
            value={replyText}
            onChange={(e) =>
              setReplyText(e.target.value)
            }
            placeholder="Write your reply..."
          />

          <button
            className="btn btn-primary mt-2"
            onClick={() =>
              handleReply(comment._id)
            }
          >
            Submit Reply
          </button>

        </div>

      )}

      <div className="ml-8 mt-6 space-y-3">

        {comments
          .filter(
            (reply) =>
              reply.parentId === comment._id
          )
          .map((reply) => (

            <div
              key={reply._id}
              className="rounded-lg bg-base-200 p-3"
            >

              <p className="font-semibold">
                {reply.author}
              </p>

              <p className="mt-1">
                {reply.text}
              </p>

            </div>

          ))}

      </div>

    </div>

))}
        </div>
      </div>
    </PrivateRoute>
  );
}
