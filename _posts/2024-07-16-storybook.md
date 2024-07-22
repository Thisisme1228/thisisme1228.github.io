---
layout: post
title: storybook
date: 2024-07-1 00:00:00 +0800
tag: storybook
---

* content
  {:toc}

<hr>

#### why does instructions in the documentation not exhibit correctly?

``` 
NO.1. one of reasons is that you use Partial on custom arguments. like this:
> Partial<BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>>

However, if you use it like this, this problem will be addressed:
> BaseButtonProps & Partial<React.ButtonHTMLAttributes<HTMLElement>>

NO.2. Default value cannot be exhibited correctly in the documentation
> not correct:
const {
        btnType = 'default',
        className,
        disabled = false,
        size,
        children,
        href,
        ...restProps
    } = props 
    
> correct:
export const Button: React.FC<ButtonProps> = ({
                                                  btnType = 'default',
                                                  className,
                                                  disabled = false,
                                                  size,
                                                  children,
                                                  href,
                                                  ...restProps
                                              })
```