function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return <Button className={className} {...props}></Button>;
}

export { Button };
