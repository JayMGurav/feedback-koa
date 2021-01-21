import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button } from "@chakra-ui/react"
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  if (!auth?.user) {
    return 'Loading...'
  }
  return <EmptyState />
}
