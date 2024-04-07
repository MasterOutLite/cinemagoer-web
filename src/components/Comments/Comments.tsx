import React, {memo, useCallback, useEffect, useState} from 'react';
import {Box, Button, Divider, Stack, TextField} from "@mui/material";
import {useAuthStore} from "../../store/useAuthStore";
import {CountData} from "../../type/count-data";
import {CommentsType} from "../../type/commentsType";
import Comment from '../Comment/Comment';
import CommentService from "../../service/comment.service";

export interface CommentsProps {
  videoId: number;
}

function Comments({videoId}: CommentsProps) {
  const {user} = useAuthStore();
  const [commentsReq, setCommentsReq] = useState<CountData<CommentsType>>({count: 0, rows: []});
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [page, setPage] = useState<number>(0)

  const [comment, setComment] = useState<string>('')

  const handleEditComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
    } = event.target;
    setComment(value);
  }

  const handleSendComment = useCallback(async () => {
    if (user) {
      console.log(videoId)

      const commentReq = await CommentService.create({videoId, comment})
      console.log(commentReq);
      setComments([commentReq, ...comments])
    } else
      console.log('Not auth user')
  }, [comment])

  useEffect(() => {

    CommentService.get({videoId, page}).then(date => {
      setCommentsReq(date);
      setComments([...date.rows])
    })
  }, []);

  console.log(comments);

  return (
    <>
      <TextField margin={'normal'} fullWidth multiline size={'small'}
                 value={comment} onChange={handleEditComment}
      />
      <Button variant="contained" onClick={handleSendComment}>Опублікувати</Button>
      <Divider sx={{marginY: {xs: '16px'}}} orientation="horizontal" variant="fullWidth"/>
      <Box mt={2}>
        <Stack gap={1}>
          {
            comments.map(value => (
              <Comment key={value.id} {...value} />
            ))
          }
        </Stack>
      </Box>
    </>
  );
}

export default memo(Comments);
