from dataclasses import dataclass


@dataclass
class Score:
    value: int = 0

    def increment(self) -> None:
        self.value += 1
