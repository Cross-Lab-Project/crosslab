import asyncio


def running_tasks():
    tasks = asyncio.all_tasks()
    current_task = asyncio.current_task()
    if current_task:
        tasks.remove(current_task)
    return tasks
