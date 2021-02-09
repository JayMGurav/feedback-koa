import React, { useState } from 'react';
import {
  Wrap, WrapItem,
} from "@chakra-ui/react"

import { ConfusedFace, CryingEmoji, HappyFace, Amazing } from '@/components/icons/ReactionIcons';

const ReactionEmojis = ({ onClickhandler, reaction }) => {
  const EmojiArray = [
    { component: CryingEmoji, value: "worst" },
    { component: ConfusedFace, value: "bad" },
    { component: HappyFace, value: "good" },
    { component: Amazing, value: "amazing" }
  ]
  return (
    <Wrap spacing={8} align="center" justify="center" mb={8} width="full">
      {EmojiArray.map(({ component, value }, i) => (
        <WrapItem
          key={value + i}
          filter={reaction == value ? "none " : "grayscale(100%)"}
          transform={reaction == value ? "scale(1.3)" : "scale(1)"}
          transition="all 0.1s cubic-bezier(.43,.43,.73,.71)"
          _hover={{
            filter: "none",
            cursor: "pointer",
            transform: "scale(1.3)"
          }}
          onClick={() => onClickhandler(value)}
        >
          {React.createElement(component)}
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default ReactionEmojis;