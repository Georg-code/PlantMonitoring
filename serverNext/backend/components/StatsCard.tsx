import React from 'react';
import { createStyles, ThemeIcon, Progress, Text, Group, Badge, Paper } from '@mantine/core';
import { Droplet } from 'tabler-icons-react';
import mitt from 'next/dist/shared/lib/mitt';

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    width: '20vw',
    minWidth: '300px',
    maxWidth: '500px',
  },

  icon: {
    position: 'absolute',
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface StatsCardProps {
  currentValue: number;
  currentTime: number;
}

export function StatsCard(props: StatsCardProps) {
  const { classes } = useStyles();

  let color = 'blue'
  if (props.currentValue < 350) {
    color = "red"
  } else if (props.currentValue > 800) {
    color = "red"
  }

  return (
    <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <Droplet size={34} />
      </ThemeIcon>

      <Text align="center" weight={700} className={classes.title}>
        Bodenfeuchtigkeit
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Aufgenommen vor {Math.floor((Date.now() /1000 - props.currentTime) / 60)} Minuten

      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Bodefeuchtigkeit
        </Text>
        <Text size="sm" color="dimmed">
          {props.currentValue / 10}%
        </Text>
      </Group>
      
 
    

      <Progress value={props.currentValue / 10} mt={5} color={color} />
  
    </Paper>
  );
}