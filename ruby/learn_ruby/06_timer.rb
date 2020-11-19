class Timer
    attr_accessor :seconds

    def initialize(s=0)
      self.seconds = s
    end           

    def time_string
      padded(@seconds/3600) + ':' + padded(@seconds%3600/60) + ':' + padded(@seconds%3600%60)
    end

    def padded(input)
      input = input < 10 ? '0' + input.to_s : input.to_s
    end
end
